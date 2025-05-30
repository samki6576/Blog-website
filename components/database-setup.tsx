"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Database, ExternalLink, Copy, AlertCircle } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export function DatabaseSetup() {
  const [setupStep, setSetupStep] = useState(0)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")

  const testConnection = async () => {
    setIsTestingConnection(true)
    try {
      const { data, error } = await supabase.from("profiles").select("count").limit(1)
      if (error) throw error
      setConnectionStatus("success")
      setSetupStep(4)
    } catch (error) {
      setConnectionStatus("error")
      console.error("Connection test failed:", error)
    }
    setIsTestingConnection(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const sqlSchema = `-- Copy and paste this entire SQL script into your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  featured_image TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create post_likes table
CREATE TABLE IF NOT EXISTS post_likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('Technology', 'technology', 'Latest tech trends and innovations'),
('Design', 'design', 'UI/UX design and creative inspiration'),
('Development', 'development', 'Programming tutorials and best practices'),
('Business', 'business', 'Business insights and entrepreneurship'),
('Lifestyle', 'lifestyle', 'Life tips and personal development'),
('Tutorial', 'tutorial', 'Step-by-step guides and how-tos')
ON CONFLICT (name) DO NOTHING;

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Posts policies
CREATE POLICY "Published posts are viewable by everyone" ON posts
  FOR SELECT USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Users can insert their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = author_id);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid() = author_id);

-- Post likes policies
CREATE POLICY "Post likes are viewable by everyone" ON post_likes
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can like posts" ON post_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike their own likes" ON post_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');`

  if (connectionStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">Setup Complete!</CardTitle>
            <CardDescription>Your BlogSpace platform is ready to use</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Your database is configured and ready. You can now start using all the features of BlogSpace!
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Continue to BlogSpace
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Database Setup Required
            </CardTitle>
            <CardDescription className="text-lg">
              Let's set up your Supabase database to get BlogSpace running
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {connectionStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Database connection failed. Please make sure you've run the SQL schema in Supabase.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Instructions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Open Supabase SQL Editor</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Go to your Supabase project dashboard and open the SQL Editor.
                    </p>
                    <Link href="https://supabase.com/dashboard" target="_blank">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Supabase
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Create New Query</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Click "New Query" in the SQL Editor to create a new SQL script.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Run the Schema</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Copy the SQL schema from the right panel and paste it into the editor, then click "Run".
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Test Connection</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      After running the schema, test the connection to make sure everything is working.
                    </p>
                    <Button
                      onClick={testConnection}
                      disabled={isTestingConnection}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      <Database className="w-4 h-4 mr-2" />
                      {isTestingConnection ? "Testing..." : "Test Connection"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - SQL Schema */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">SQL Schema</h3>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(sqlSchema)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy SQL
                  </Button>
                </div>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg max-h-96 overflow-y-auto text-xs font-mono">
                  <pre>{sqlSchema}</pre>
                </div>
                <Alert>
                  <Database className="h-4 w-4" />
                  <AlertDescription>
                    This script will create all necessary tables, policies, and triggers for your blog platform.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

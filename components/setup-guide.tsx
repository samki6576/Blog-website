"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExternalLink, Database } from "lucide-react"
import Link from "next/link"

export function SetupGuide() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const isConfigured = supabaseUrl && supabaseKey && supabaseUrl !== "" && supabaseKey !== ""

  if (isConfigured) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to BlogSpace!
            </CardTitle>
            <CardDescription className="text-lg">Let's set up your blog platform in just a few steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Database className="h-4 w-4" />
              <AlertDescription>
                You need to configure Supabase to get started. Follow the steps below to set up your database.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Create Supabase Project</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Sign up for a free Supabase account and create a new project.
                  </p>
                  <Link href="https://supabase.com" target="_blank">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Go to Supabase
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Run Database Schema</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Copy and run the SQL schema from{" "}
                    <code className="bg-gray-100 px-1 rounded">supabase-schema.sql</code> in your Supabase SQL editor.
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                    SQL Editor → New Query → Paste Schema → Run
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Setup Storage</h3>
                  <p className="text-sm text-gray-600 mb-3">Create a storage bucket named "images" for file uploads.</p>
                  <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                    Storage → Create Bucket → Name: "images" → Public: true
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Configure Environment Variables</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Create a <code className="bg-gray-100 px-1 rounded">.env.local</code> file with your Supabase
                    credentials.
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                    <div>NEXT_PUBLIC_SUPABASE_URL=your-project-url</div>
                    <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Find these in: Settings → API → Project URL & anon/public key
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">5</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Restart Development Server</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    After setting up the environment variables, restart your development server.
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-xs font-mono">npm run dev</div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Need help? Check out the{" "}
                <Link href="https://supabase.com/docs" target="_blank" className="text-blue-600 hover:underline">
                  Supabase documentation
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

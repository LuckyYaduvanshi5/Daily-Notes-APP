
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const HowToUse = () => {
  return (
    <div className="container max-w-3xl mx-auto px-4 pb-10 animate-fade-in">
      <div className="flex items-center justify-between py-4 mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back to Notes</span>
          </Button>
        </Link>
        <h1 className="text-xl md:text-2xl font-bold">How to Use</h1>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
          <div className="space-y-4">
            <p>Daily Notes is a simple yet powerful app that helps you capture your thoughts, ideas, and important information. All your notes are stored locally on your device and can be backed up to WhatsApp or Google Drive.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Creating Notes</h2>
          <div className="space-y-4">
            <p>To create a new note:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Click the "New Note" button at the top of the screen</li>
              <li>Add a title for your note (required)</li>
              <li>Write your content in the text area</li>
              <li>Click "Save" to store your note</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Voice Notes</h2>
          <div className="space-y-4">
            <p>To record a voice note:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>When creating or editing a note, click the microphone icon</li>
              <li>Grant microphone permission if prompted</li>
              <li>Speak your note and click the stop button when finished</li>
              <li>The voice recording will be saved with your note</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Backup Options</h2>
          <div className="space-y-4">
            <p>You can back up your notes in several ways:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>WhatsApp Backup:</strong> Share individual notes to your WhatsApp by clicking the "Share to WhatsApp" button</li>
              <li><strong>Google Drive Backup:</strong> Export all your notes to Google Drive by clicking the backup button in the settings</li>
              <li><strong>PDF Export:</strong> Generate a PDF of your notes from the export menu</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Tips and Tricks</h2>
          <div className="space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li>Your notes are automatically saved as you type</li>
              <li>Toggle between light and dark mode using the button in the header</li>
              <li>Notes are organized by date for easy navigation</li>
              <li>All features are completely free to use</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowToUse;

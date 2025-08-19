/**
 * Code snippets for each service displayed on the monitor
 */
export const codeSnippets = {
  websites: `// Next.js Website Component
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hero-section"
    >
      <h1>Welcome to WB Digital</h1>
      <p>Building amazing web experiences</p>
    </motion.div>
  );
}`,
  
  automation: `# Python Automation Script
import requests
import pandas as pd
from datetime import datetime

def automate_report():
    # Fetch data from API
    response = requests.get('api/data')
    data = response.json()
    
    # Process with pandas
    df = pd.DataFrame(data)
    df['timestamp'] = datetime.now()
    
    # Generate automated report
    df.to_excel('report.xlsx')
    print("✅ Report generated!")`,
    
  ai: `// AI Integration with OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

async function generateContent(prompt) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7
  });
  
  return completion.choices[0].message;
}`
};

export type ServiceType = keyof typeof codeSnippets;
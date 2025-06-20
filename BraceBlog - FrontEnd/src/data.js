import Thumbnail1 from './assets/thumbnail1.png';
import Thumbnail2 from './assets/thumbnail2.png';
import Thumbnail3 from './assets/thumbnail3.png';
import Thumbnail4 from './assets/thumbnail4.png';

export const DUMMY_POSTS = [
    { 
        id: '1',
        thumbnail: Thumbnail1,
        category: 'Frontend',
        title: 'Mastering Modern React Patterns',
        description: `<h2>Introduction to Advanced React Patterns</h2>
        <p>React has evolved significantly over the years, and with it, the patterns we use to build scalable applications. In this comprehensive guide, we'll explore <strong>advanced React patterns</strong> that will take your development skills to the next level.</p>
        
        <h3>What You'll Learn</h3>
        <ul>
            <li><strong>Custom Hooks:</strong> Create reusable stateful logic</li>
            <li><strong>Compound Components:</strong> Build flexible component APIs</li>
            <li><strong>Render Props:</strong> Share code between components</li>
            <li><strong>Higher-Order Components:</strong> Enhance component functionality</li>
        </ul>
        
        <blockquote>
            "The best React code is not just functional, but also elegant and maintainable." - Kent C. Dodds
        </blockquote>
        
        <h3>Code Example: Custom Hook</h3>
        <pre><code>function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  
  return { count, increment, decrement };
}</code></pre>
        
        <p>This pattern allows us to <em>encapsulate stateful logic</em> and reuse it across multiple components.</p>`,
        authorID: '1',
    },
    {
        id: '2',
        thumbnail: Thumbnail2,
        category: 'AI/ML',
        title: 'Building AI-Powered Applications with Next.js',
        description: `<h2>The Future of Web Development is AI</h2>
        <p>Artificial Intelligence is revolutionizing how we build web applications. With <strong>Next.js</strong> and modern AI APIs, creating intelligent applications has never been more accessible.</p>
        
        <h3>Technologies We'll Cover</h3>
        <ol>
            <li><strong>OpenAI GPT Integration</strong> - Natural language processing</li>
            <li><strong>Image Generation APIs</strong> - DALL-E and Midjourney</li>
            <li><strong>Vector Databases</strong> - Pinecone and Supabase</li>
            <li><strong>Real-time Chat</strong> - Socket.io implementation</li>
        </ol>
        
        <h3>Project Architecture</h3>
        <p>Our AI-powered application will feature:</p>
        <ul>
            <li>🤖 <strong>Intelligent Chatbot</strong> with context awareness</li>
            <li>🎨 <strong>Dynamic Image Generation</strong> based on user prompts</li>
            <li>📊 <strong>Data Analysis</strong> with natural language queries</li>
            <li>🔍 <strong>Semantic Search</strong> across content</li>
        </ul>
        
        <blockquote>
            "AI is not just a tool, it's a new way of thinking about user interactions."
        </blockquote>
        
        <p><em>Ready to build the future?</em> Let's dive into the code and create something amazing!</p>`,
        authorID: '2',
    },
    {
        id: '3',
        thumbnail: Thumbnail3,
        category: 'Backend',
        title: 'Microservices Architecture with Node.js',
        description: `<h2>Scaling Applications with Microservices</h2>
        <p>As applications grow, <strong>monolithic architectures</strong> become difficult to maintain and scale. Microservices offer a solution by breaking applications into smaller, manageable services.</p>
        
        <h3>Key Benefits</h3>
        <ul>
            <li>🚀 <strong>Independent Deployment</strong> - Deploy services separately</li>
            <li>📈 <strong>Horizontal Scaling</strong> - Scale services based on demand</li>
            <li>🛠️ <strong>Technology Diversity</strong> - Use different tools for different services</li>
            <li>🔒 <strong>Fault Isolation</strong> - One service failure doesn't crash the system</li>
        </ul>
        
        <h3>Architecture Overview</h3>
        <p>Our microservices architecture includes:</p>
        <ol>
            <li><strong>API Gateway</strong> - Single entry point for all requests</li>
            <li><strong>Service Discovery</strong> - Dynamic service registration</li>
            <li><strong>Message Queue</strong> - Asynchronous communication</li>
            <li><strong>Database per Service</strong> - Data isolation and independence</li>
        </ol>
        
        <h3>Example: User Service API</h3>
        <pre><code>// user-service/routes/users.js
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});</code></pre>
        
        <blockquote>
            "Microservices are not a silver bullet, but they're powerful when used correctly."
        </blockquote>`,
        authorID: '3',
    },
    {
        id: '4',
        thumbnail: Thumbnail4,
        category: 'DevOps',
        title: 'Modern CI/CD Pipelines with GitHub Actions',
        description: `<h2>Automating Your Development Workflow</h2>
        <p>Modern software development requires <strong>continuous integration and deployment</strong>. GitHub Actions provides a powerful platform for automating your entire development pipeline.</p>
        
        <h3>Pipeline Components</h3>
        <ul>
            <li>✅ <strong>Automated Testing</strong> - Unit, integration, and E2E tests</li>
            <li>🔍 <strong>Code Quality Checks</strong> - ESLint, Prettier, SonarQube</li>
            <li>🏗️ <strong>Build Process</strong> - Compile, bundle, and optimize</li>
            <li>🚀 <strong>Deployment</strong> - Multiple environments with zero downtime</li>
        </ul>
        
        <h3>Sample Workflow Configuration</h3>
        <pre><code>name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test</code></pre>
        
        <h3>Deployment Strategies</h3>
        <ol>
            <li><strong>Blue-Green Deployment</strong> - Zero downtime updates</li>
            <li><strong>Canary Releases</strong> - Gradual rollout to users</li>
            <li><strong>Feature Flags</strong> - Control feature visibility</li>
        </ol>
        
        <blockquote>
            "A good CI/CD pipeline is like a safety net - it catches issues before they reach production."
        </blockquote>
        
        <p><em>Ready to streamline your development process?</em> Let's build a robust pipeline together!</p>`,
        authorID: '4',
    },
];

export const DUMMY_AUTHORS = [
    {
        id: '1',
        avatar: Thumbnail1,
        name: 'Alex Chen',
        posts: 12,
        description: 'Senior Frontend Developer specializing in React, TypeScript, and modern web technologies.'
    },
    {
        id: '2',
        avatar: Thumbnail2,
        name: 'Sarah Johnson',
        posts: 8,
        description: 'AI/ML Engineer with expertise in building intelligent applications and data science.'
    },
    {
        id: '3',
        avatar: Thumbnail3,
        name: 'Michael Rodriguez',
        posts: 15,
        description: 'Full-stack Developer and DevOps enthusiast passionate about scalable architectures.'
    },
    {
        id: '4',
        avatar: Thumbnail4,
        name: 'Emily Davis',
        posts: 6,
        description: 'Cloud Architect and DevOps specialist focused on automation and infrastructure.'
    },
];

export const PROGRAMMING_CATEGORIES = [
    'Frontend',
    'Backend', 
    'Full-Stack',
    'AI/ML',
    'DevOps',
    'Mobile',
    'Web3',
    'Cloud',
    'Security',
    'Database',
    'Testing',
    'Architecture'
];
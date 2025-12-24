export const DEPLOYMENT_STEPS = [
  {
    id: 1,
    title: "第一步：获取 API Key",
    description: "访问 aistudio.google.com 获取免费密钥。",
    icon: "🔑",
    details: ["点击 'Get API key'", "复制以 'AIza' 开头的字符串"]
  },
  {
    id: 2,
    title: "第二步：在 Vercel 设置环境变量",
    description: "让 Vercel 知道你的 Key。",
    icon: "🔌",
    details: ["Settings -> Environment Variables", "添加 API_KEY = 你的密钥"]
  },
  {
    id: 3,
    title: "第三步：重新部署",
    description: "点击 Redeploy 让配置生效。",
    icon: "🚀",
    details: ["Deployments -> Redeploy"]
  }
];

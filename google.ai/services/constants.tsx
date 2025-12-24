
export const DEPLOYMENT_STEPS = [
  {
    id: 1,
    title: "第一步：获取你的专属密钥",
    description: "这是驱动 AI 的能量来源，完全免费。",
    icon: "🔑",
    details: [
      "访问 Google AI Studio (aistudio.google.com)",
      "点击左侧 'Get API key' 蓝色按钮",
      "复制那串以 'AIza...' 开头的代码"
    ],
    tips: "如果无法访问，可能需要网络加速。请妥善保存该 Key，不要泄露。"
  },
  {
    id: 2,
    title: "第二步：让网页与密钥绑定",
    description: "在 Vercel 部署后台告诉你的网页 Key 是什么。",
    icon: "🔌",
    details: [
      "进入你的 Vercel Dashboard，点击本项目",
      "进入 Settings -> Environment Variables",
      "Key 填入：API_KEY",
      "Value 填入：你刚才复制的那串代码",
      "点击 Add 或 Save"
    ]
  },
  {
    id: 3,
    title: "第三步：点燃引擎，起飞！",
    description: "配置生效需要重新生成一次网页。",
    icon: "🚀",
    details: [
      "点击 Vercel 顶部的 Deployments 标签",
      "找到最近的一次记录，点击右侧三个点 '...'",
      "选择 'Redeploy'，等待它显示 'Ready'",
      "刷新当前页面，AI 即可上线！"
    ],
    tips: "如果你在改代码，GitHub 提交代码（Commit）也会触发自动部署哦！"
  }
];

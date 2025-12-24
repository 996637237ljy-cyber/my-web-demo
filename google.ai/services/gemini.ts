
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    throw new Error("⚠️ 缺失 API_KEY！请在部署环境的 Settings 中添加它。");
  }
  return new GoogleGenAI({ apiKey });
};

export const chatWithAI = async (prompt: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    return response.text;
  } catch (error: any) {
    if (error.message?.includes('403')) throw new Error("API Key 无效或权限不足。");
    if (error.message?.includes('429')) throw new Error("请求太频繁了，请稍后再试。");
    throw error;
  }
};

export const generateImage = async (prompt: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { 
        imageConfig: { 
          aspectRatio: "1:1" 
        } 
      }
    });

    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (part?.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
    throw new Error("AI 没能生成图片，换个描述试试？");
  } catch (error: any) {
    throw new Error(`绘图失败: ${error.message}`);
  }
};

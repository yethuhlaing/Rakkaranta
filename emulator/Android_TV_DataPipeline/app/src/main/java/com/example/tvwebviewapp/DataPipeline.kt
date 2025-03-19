package com.example.tvwebviewapp

import android.content.Context
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import java.io.InputStreamReader

object DataPipeline {
    fun extractAndTransform(context: Context): List<WebContent> {
        // 提取：从 raw 资源中读取 JSON 文件
        val inputStream = context.resources.openRawResource(R.raw.web_contents)
        val reader = InputStreamReader(inputStream)
        val jsonString = reader.readText()
        reader.close()

        // 转换：将 JSON 解析为 List<WebContent>
        val gson = Gson()
        val type = object : TypeToken<List<WebContent>>() {}.type
        return gson.fromJson(jsonString, type)
    }
}
package com.example.tvwebviewapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.webkit.WebView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 初始化 WebView
        val webView: WebView = findViewById(R.id.webView)
        webView.settings.javaScriptEnabled = true
        webView.loadUrl("https://wokwi.com/")

        // 初始化 RecyclerView
        val recyclerView: RecyclerView = findViewById(R.id.contentRecyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)

        // 数据管道：提取和转换数据
        val webContents = DataPipeline.extractAndTransform(this)

        // 加载：设置适配器
        val adapter = WebContentAdapter(webContents) { selectedContent ->
            // 点击事件：加载选中的网页
            webView.loadUrl(selectedContent.url)
        }
        recyclerView.adapter = adapter
    }
}
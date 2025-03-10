package com.example.tvwebviewapp

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class WebContentAdapter(
    private val webContents: List<WebContent>,
    private val onItemClick: (WebContent) -> Unit
) : RecyclerView.Adapter<WebContentAdapter.ViewHolder>() {

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val titleTextView: TextView = itemView.findViewById(R.id.titleTextView)

        fun bind(webContent: WebContent, onItemClick: (WebContent) -> Unit) {
            titleTextView.text = webContent.title
            itemView.setOnClickListener { onItemClick(webContent) }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_web_content, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val webContent = webContents[position]
        holder.bind(webContent, onItemClick)
    }

    override fun getItemCount(): Int = webContents.size
}
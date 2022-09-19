package com.example.squadmap.ui.web

import androidx.compose.runtime.Composable
import com.google.accompanist.web.WebView
import com.google.accompanist.web.rememberWebViewState

@Composable
fun StoreWebView() {
    val state = rememberWebViewState("https://www.naver.com/")
    WebView(
        state = state,
        onCreated = { it.settings.javaScriptEnabled = true }
    )
}
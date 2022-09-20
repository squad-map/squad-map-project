package com.example.squadmap.ui.web

import android.webkit.WebResourceRequest
import android.webkit.WebView
import androidx.compose.runtime.Composable
import com.example.squadmap.ui.utils.logger
import com.google.accompanist.web.AccompanistWebViewClient
import com.google.accompanist.web.WebView
import com.google.accompanist.web.rememberWebViewState

private const val SCHEME = "http"
private const val GITHUB_CALLBACK = "localhost:3000/login/github/callback"
private const val CODE = "code"
@Composable
fun StoreWebView(url: String) {
    val state = rememberWebViewState("https://www.naver.com/")
    WebView(
        state = state,
        onCreated = { it.settings.javaScriptEnabled = true }
    )
}

@Composable
fun GithubLoginWebView(url: String) {
    val client = GithubLoginClient()
    val state = rememberWebViewState(url)

    WebView(
        state = state,
        onCreated = { it.settings.javaScriptEnabled = true },
        client = client
    )
}

class GithubLoginClient: AccompanistWebViewClient() {

    private fun checkUrl(request: WebResourceRequest?) {
        val url = request?.url ?: return
        val code = url.getQueryParameter("code")

        if (url.scheme == SCHEME &&
            url.host == GITHUB_CALLBACK &&
            code != null
        ) {
            logger("test code $code")
        }
    }

    override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
        checkUrl(request)
        return super.shouldOverrideUrlLoading(view, request)
    }

}
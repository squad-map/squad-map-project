package com.example.squadmap.ui.web

import android.webkit.WebResourceRequest
import android.webkit.WebView
import androidx.compose.runtime.Composable
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.squadmap.common.logger
import com.example.squadmap.ui.common.navigation.SquadMapNavigation
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.google.accompanist.web.AccompanistWebViewClient
import com.google.accompanist.web.WebView
import com.google.accompanist.web.rememberWebViewState

private const val SCHEME = "http"
private const val HOST = "localhost"
private const val CODE = "code"

@Composable
fun StoreWebView(url: String) {
    val state = rememberWebViewState(url)
    WebView(
        state = state,
        onCreated = { it.settings.javaScriptEnabled = true }
    )
}

@Composable
fun OAuthLoginWebView(
    viewModel: LoginViewModel = hiltViewModel(),
    move: () -> Unit,
    url: String,
    state: String?) {
    val client = LoginClient(
        login = { code ->
            viewModel.login(code, state)
        },
        move = move
    )

    val webView = rememberWebViewState(url)

    WebView(
        state = webView,
        onCreated = { it.settings.javaScriptEnabled = true },
        client = client
    )
}

class LoginClient(
    private val login: (String) -> Unit,
    private val move: () -> Unit
) : AccompanistWebViewClient() {

    private fun checkUrl(request: WebResourceRequest?) {
        val url = request?.url ?: return
        val code = url.getQueryParameter(CODE)

        if (url.scheme == SCHEME &&
            url.host == HOST &&
            code != null
        ) {
            logger("test code $code")
            login(code)
            move()
        }
    }

    override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
        checkUrl(request)
        return super.shouldOverrideUrlLoading(view, request)
    }

}
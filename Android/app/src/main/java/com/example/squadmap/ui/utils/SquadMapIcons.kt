package com.example.squadmap.ui.utils

import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.Composable

@Composable
fun SearchButton(
    onClick: () -> Unit
) {
    IconButton(onClick = {
        onClick()
    }) {
        Icon(imageVector = Icons.Filled.Search, contentDescription ="Search" )
    }
}
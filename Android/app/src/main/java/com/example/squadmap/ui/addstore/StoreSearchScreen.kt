package com.example.squadmap.ui.addstore

import androidx.compose.material.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.squadmap.ui.theme.SquadMapTheme

@Composable
fun StoreSearchScreen(
    viewModel: AddStoreViewModel
) {
    TextField(
        value = viewModel.query.value,
        onValueChange = viewModel::updateQuery
    )
}

@Preview(showBackground = true)
@Composable
private fun DefaultPreview() {
    SquadMapTheme {
        StoreSearchScreen(
            viewModel()
        )
    }
}
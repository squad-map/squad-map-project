package com.example.squadmap.ui.addstore

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.Icon
import androidx.compose.material.Scaffold
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.ui.TopAppbar
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.SquadMapTheme

@Composable
fun StoreDescriptionScreen(
    routAction: SquadMapRoutAction,
    viewModel: AddStoreViewModel = hiltViewModel()
) {
    Scaffold(
        topBar = {
            TopAppbar(
                title = "장소 등록",
                routAction = routAction,
                isSearchVisible = false,
                isAddVisible = false,
                navigationIcon = {
                    Icon(
                        imageVector = Icons.Filled.ArrowBack,
                        contentDescription = "back"
                    )
                }
            )
        },
        modifier = Modifier.fillMaxSize()
    ) {
        
    }
}

@Preview(showBackground = false)
@Composable
fun DefaultScreen() {
    SquadMapTheme {
        StoreDescriptionScreen(routAction = SquadMapRoutAction(rememberNavController()))
    }
}
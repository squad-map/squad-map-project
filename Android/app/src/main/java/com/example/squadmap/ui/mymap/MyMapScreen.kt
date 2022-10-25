package com.example.squadmap.ui.mymap

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.ui.common.navigation.SquadMapNavigation
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.Main
import com.example.squadmap.ui.theme.SquadMapTheme

@Composable
fun MyMapScreen(
    routAction: SquadMapRoutAction,
    myMapViewModel: MyMapViewModel = hiltViewModel()
) {
    if(myMapViewModel.isLogin()) {
        Scaffold(
            topBar = { TopAppbar() }
        ) { paddingValues ->
            Box(modifier = Modifier.padding(paddingValues)) {
                Text(text = "MyMapScreen", fontSize = 20.sp)
            }
        }
    } else {
        routAction.navToRout(SquadMapNavigation.LOGIN)
    }
}

@Composable
private fun TopAppbar() {
    TopAppBar(
        elevation = 4.dp,
        title = {
            Text("SquarMap")
        },
        backgroundColor = Main,
        navigationIcon = {
            IconButton(onClick = {/* Do Something*/ }) {
                Icon(Icons.Filled.ArrowBack, null)
            }
        }
    )
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    SquadMapTheme {
        MyMapScreen(
            routAction = SquadMapRoutAction(rememberNavController()),
            myMapViewModel = viewModel()
        )
    }
}
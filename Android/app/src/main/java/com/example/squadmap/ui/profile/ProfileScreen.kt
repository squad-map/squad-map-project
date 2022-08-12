package com.example.squadmap.ui.profile

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.squadmap.ui.mymap.MyMapScreen
import com.example.squadmap.ui.theme.MainGreen
import com.example.squadmap.ui.theme.SquadMapTheme

@Composable
fun ProfileScreen() {
    Scaffold(
        topBar = { TopAppbar()}
    ) { paddingValues ->  
        Box(modifier = Modifier.padding(paddingValues)) {
            Text(text = "ProfileScreen")
        }
    }
}

@Composable
private fun TopAppbar() {
    TopAppBar(
        elevation = 4.dp,
        title = {
            Text("SquarMap")
        },
        backgroundColor = MainGreen,
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
        MyMapScreen()
    }
}
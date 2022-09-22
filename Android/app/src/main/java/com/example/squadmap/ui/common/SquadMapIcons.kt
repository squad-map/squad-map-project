package com.example.squadmap.ui.common

import androidx.compose.foundation.shape.CornerSize
import androidx.compose.material.FloatingActionButton
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.MaterialTheme
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.R
import com.example.squadmap.common.logger
import com.example.squadmap.ui.common.navigation.SquadMapNavigation
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.Main
import com.example.squadmap.ui.theme.SquadMapTheme

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

@Composable
fun AddButton(
    onClick: () -> Unit
) {
    IconButton(onClick = {
        onClick()
    }) {
        Icon(imageVector = Icons.Filled.Add, contentDescription = "add")
    }
}


@Composable
fun FloatingAddButton(
    onClick: () -> Unit
) {
    FloatingActionButton(
        backgroundColor = Color(Main.value),
        shape = MaterialTheme.shapes.small.copy(CornerSize(60)),
        onClick = {
            onClick()
        }
    ) {
        Icon(painter = painterResource(id = R.drawable.ic_add), contentDescription = "add" )
    }
}

@Preview(showBackground = true)
@Composable
private fun DefaultPreview() {
    SquadMapTheme {
        AddButton {
            logger("")
        }
    }
}

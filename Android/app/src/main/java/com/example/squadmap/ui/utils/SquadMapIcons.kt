package com.example.squadmap.ui.utils

import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.Composable
import com.example.squadmap.ui.navigation.SquadMapNavigation
import com.example.squadmap.ui.navigation.SquadMapRoutAction

@Composable
fun SearchButton(
    routAction: SquadMapRoutAction,
    rout: SquadMapNavigation
) {
    IconButton(onClick = {
        routAction.navToRout(rout)
    }) {
        Icon(imageVector = Icons.Filled.Search, contentDescription ="Search" )
    }
}
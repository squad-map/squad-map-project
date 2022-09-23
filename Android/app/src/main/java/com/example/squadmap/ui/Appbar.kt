package com.example.squadmap.ui

import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.ui.common.AddButton
import com.example.squadmap.ui.common.SearchButton
import com.example.squadmap.ui.common.navigation.SquadMapNavigation
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.Main
import com.example.squadmap.ui.theme.SquadMapTheme

@Composable
fun TopAppbar(
    routAction: SquadMapRoutAction,
    title: String = "SquarMap",
    isSearchVisible: Boolean,
    isAddVisible: Boolean,
    navigationIcon: @Composable (() -> Unit)? = null
) {
    TopAppBar(
        elevation = 4.dp,
        title = {
            Text(title)
        },
        backgroundColor = Main,
        actions = {
            if(isAddVisible) {
                AddButton{ routAction.navToRout(SquadMapNavigation.SEARCH_STORE_FOR_ADD) }
            }
            if(isSearchVisible) {
                SearchButton { routAction.navToRout(SquadMapNavigation.SEARCH_SCREEN) }
            }
        },
        navigationIcon = navigationIcon
    )
}

@Preview(showBackground = true)
@Composable
fun AppbarPreview() {
    SquadMapTheme {
        TopAppbar(
            routAction = SquadMapRoutAction(rememberNavController()),
            isSearchVisible = true,
            isAddVisible = false,
        )
    }
}
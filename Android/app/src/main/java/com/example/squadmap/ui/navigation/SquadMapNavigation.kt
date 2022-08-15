package com.example.squadmap.ui.navigation

import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController

enum class SquadMapNavigation(val route: String) {
    HOME("HOME"), SEARCH_SCREEN("SEARCH")
}


class SquadMapRoutAction(navHostController: NavHostController) {
    val navToRout: (SquadMapNavigation) -> Unit = { rout ->
        navHostController.navigate(rout.route) {
            popUpTo(navHostController.graph.findStartDestination().id) {
                saveState = true
            }

            launchSingleTop = true
            restoreState = true
        }
    }
}

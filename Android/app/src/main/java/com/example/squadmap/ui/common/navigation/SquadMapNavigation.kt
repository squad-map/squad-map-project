package com.example.squadmap.ui.common.navigation

import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController

enum class SquadMapNavigation(val route: String) {
    HOME("HOME"),
    SEARCH_SCREEN("SEARCH"),
    STORE_LIST("STORE_LIST"),
    MAP_VIEW("MAP_VIEW"),
    WEB("WEB"),
    MY_MAP( "MY_MAP"),
    PROFILE("PROFILE"),
    GITHUB_LOGIN("GITHUB_LOGIN"),
    SEARCH_STORE_FOR_ADD("SEARCH_STORE_FOR_ADD"),
    ADD_STORE_DESCRIPTION("ADD_STORE_DESCRIPTION")
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

    val navToWebView: (SquadMapNavigation, String) -> Unit = { rout, url ->
        navHostController.navigate("${rout.route}/$url") {
            popUpTo(navHostController.graph.findStartDestination().id) {
                saveState = true
            }
            launchSingleTop = true
            restoreState = true
        }
    }

    val back = {
        navHostController.popBackStack()
    }
}

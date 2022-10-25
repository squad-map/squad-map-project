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
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.ui.common.navigation.SquadMapNavigation
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.Main
import com.example.squadmap.ui.theme.SquadMapTheme

@Composable
fun ProfileScreen(
    profileViewModel: ProfileViewModel = hiltViewModel(),
    routAction: SquadMapRoutAction
) {
    if(profileViewModel.isLogin()) {
        Scaffold(
            topBar = { TopAppbar()}
        ) { paddingValues ->
            Box(modifier = Modifier.padding(paddingValues)) {
                Text(text = "ProfileScreen")
            }
        }
    } else{
        routAction.navToRout(SquadMapNavigation.LOGIN)
    }
}
// 마이맵, 프로필 뷰모델, 레포지토리 만들고 jwt 체크 후 없으면 안내띄우고 로그인페이지 연결
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
        ProfileScreen(
            routAction = SquadMapRoutAction(
                rememberNavController()
            )
        )
    }
}
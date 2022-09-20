package com.example.squadmap.ui.map

import android.graphics.Color.parseColor
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Icon
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.R
import com.example.squadmap.ui.navigation.SquadMapNavigation
import com.example.squadmap.ui.navigation.SquadMapRoutAction
import com.example.squadmap.ui.search.SearchScreen
import com.example.squadmap.ui.theme.SquadMapTheme
import com.naver.maps.geometry.LatLng
import com.naver.maps.map.CameraPosition
import com.naver.maps.map.compose.*

@OptIn(ExperimentalNaverMapApi::class)
@Composable
fun StoreMapScreen(
    routAction: SquadMapRoutAction,
    mapViewModel: MapViewModel = viewModel()
) {
    val mapUiSettings by remember {
        mutableStateOf(
            MapUiSettings(
                isLocationButtonEnabled = false
            )
        )
    }
    val seoul = LatLng(mapViewModel.mapInfo.store[0].lat, mapViewModel.mapInfo.store[0].long)
    val cameraPositionState: CameraPositionState = rememberCameraPositionState {
        // 카메라 초기 위치를 설정합니다.
        position = CameraPosition(seoul, 10.0)
    }
    Box {
        NaverMap(
            uiSettings = mapUiSettings,
            modifier = Modifier.fillMaxSize(),
            cameraPositionState = cameraPositionState
        ) {
            mapViewModel.mapInfo.store.forEach {
                Marker(
                    state = MarkerState(LatLng(it.lat, it.long)),
                    iconTintColor = Color(parseColor(it.category.color))
                )
            }
        }
        Column(
            modifier = Modifier.padding(start = 20.dp, top = 20.dp)
        ) {
            Row {
                MapBackButton(routAction)
                Spacer(modifier = Modifier.width(220.dp))
                Owner(name = mapViewModel.mapInfo.owner)
            }

        }
    }
}

@Composable
fun Owner(name: String) {
    Surface(
        shape = RoundedCornerShape(20.dp),
        color = Color.White,
        modifier = Modifier
            .wrapContentSize()
            .padding(start = 10.dp, top = 5.dp, end = 10.dp, bottom = 5.dp),
    ) {
        Text(
            text = name,
            modifier = Modifier
                .wrapContentSize()
                .padding(start = 10.dp, top = 5.dp, end = 10.dp, bottom = 5.dp),
            maxLines = 2
        )
    }
}

@Composable
fun MapBackButton(routAction: SquadMapRoutAction) {
    Surface(
        shape = CircleShape,
        modifier = Modifier
            .width(40.dp)
            .height(40.dp)
            .clickable {
                routAction.navToRout(SquadMapNavigation.STORE_LIST)
            },
        color = Color.White
    ) {
        Icon(
            painter = painterResource(id = R.drawable.ic_baseline_arrow_back_ios_24),
            contentDescription = "back",
            modifier = Modifier.padding(start = 10.dp)
        )
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    SquadMapTheme {
        Owner("머핀")
    }
}
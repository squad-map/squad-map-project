package com.example.squadmap.ui.map

import android.graphics.Color.parseColor
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.material.Icon
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.R
import com.example.squadmap.common.logger
import com.example.squadmap.data.model.CategoryInfo
import com.example.squadmap.data.model.StoreInfo
import com.example.squadmap.ui.navigation.SquadMapNavigation
import com.example.squadmap.ui.navigation.SquadMapRoutAction
import com.example.squadmap.ui.search.SearchScreen
import com.example.squadmap.ui.theme.SquadMapTheme
import com.naver.maps.geometry.LatLng
import com.naver.maps.map.CameraPosition
import com.naver.maps.map.CameraUpdate
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
    val cameraPositionState: CameraPositionState = rememberCameraPositionState {
        // 카메라 초기 위치를 설정합니다.
        position = CameraPosition(mapViewModel.cameraLatLongState.value, 10.0)
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
            MapScreenTopComponent(
                routAction = routAction,
                owner = mapViewModel.mapInfo.owner
            )
            Spacer(modifier = Modifier.height(590.dp))
            StoreList(
                onClick = { lat, long ->
                    val cameraUpdate = CameraUpdate.scrollTo(LatLng(lat, long))
                    cameraPositionState.move(cameraUpdate)
                },
                stores = mapViewModel.mapInfo.store
            )
        }
    }
}

@Composable
fun StoreList(
    onClick: (Double, Double) -> Unit,
    stores: List<StoreInfo>
) {
    LazyRow {
        items(
            items = stores,
            itemContent = { item ->
                Spacer(modifier = Modifier.width(5.dp))
                CardStoreItem(storeInfo = item) { lat, long ->
                    logger("$lat, $long")
                    onClick(lat, long)
                }
                Spacer(modifier = Modifier.width(5.dp))
            }
        )
    }
}

@Composable
fun CardStoreItem(
    storeInfo: StoreInfo,
    onClick: (lat: Double, long: Double) -> Unit
) {
    Card(
        modifier = Modifier
            .clickable {
                onClick(storeInfo.lat, storeInfo.long)
            }
            .width(200.dp)
            .height(100.dp),
        shape = RoundedCornerShape(20.dp),
        border = BorderStroke(1.dp, Color.Gray),
        backgroundColor = Color.White
    ) {
        Column {
            Row {
                Text(
                    text = storeInfo.title,
                    modifier = Modifier.padding(start = 10.dp, top = 15.dp),
                    fontSize = 13.sp
                )
                Text(
                    text = storeInfo.category.name,
                    color = Color(parseColor(storeInfo.category.color)),
                    modifier = Modifier.padding(start = 95.dp, end = 10.dp, top = 15.dp),
                    fontSize = 12.sp
                )
            }
            Text(
                text = storeInfo.address,
                color = Color.Gray,
                fontSize = 11.sp,
                modifier = Modifier.padding(start = 10.dp, top = 6.dp)
            )
            Text(
                text = storeInfo.description,
                color = Color.Gray,
                fontSize = 11.sp,
                modifier = Modifier.padding(start = 10.dp, top = 6.dp, bottom = 5.dp),
                maxLines = 2
            )
        }
    }
}

@Composable
fun MapScreenTopComponent(routAction: SquadMapRoutAction, owner: String) {
    Row {
        MapBackButton(routAction)
        Spacer(modifier = Modifier.width(220.dp))
        Owner(name = owner)
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
        CardStoreItem(
            storeInfo = StoreInfo(
                "테일러커피",
                CategoryInfo(
                    "카페",
                    "#ff0000",
                    "카페"
                ),
                "서울 마포구 잔다리로",
                37.532600,
                127.124612,
                "맛있는카페"
            )
        ) { lat, long ->
            logger("$lat, $long")
        }
    }
}


package com.example.squadmap.ui.map

import android.graphics.Color.parseColor
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.material.Icon
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.R
import com.example.squadmap.common.logger
import com.example.squadmap.data.model.StoreInfo
import com.example.squadmap.ui.common.FloatingAddButton
import com.example.squadmap.ui.common.navigation.SquadMapNavigation
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.SquadMapTheme
import net.daum.mf.map.api.MapPoint


@Composable
private fun MapViewScreen(
    latitude: String,
    longitude: String,
    viewModel: MapViewModel
) {
    AndroidView(
        factory = { context ->
            viewModel.setMapView(context)
        }, modifier = Modifier
            .fillMaxSize()
    ) { mapView ->
        mapView.setMapCenterPoint(
            MapPoint.mapPointWithGeoCoord(
                latitude.toDouble(),
                longitude.toDouble()
            ), true
        )
        mapView.setZoomLevel(4, true)
    }
}

@Composable
fun StoreMapScreen(
    routAction: SquadMapRoutAction,
    mapViewModel: MapViewModel = hiltViewModel()
) {
    Box {
        MapViewScreen(
            latitude = mapViewModel.mapInfo.store[0].lat.toString(),
            longitude = mapViewModel.mapInfo.store[0].long.toString(),
            viewModel = mapViewModel
        )
        MapUiComponent(
            routAction = routAction,
            mapViewModel = mapViewModel
        )
    }
}

@Composable
fun MapUiComponent(
    routAction: SquadMapRoutAction,
    mapViewModel: MapViewModel,
) {
    Column(
        modifier = Modifier
            .padding(start = 20.dp, top = 20.dp)
            .fillMaxWidth()
    ) {
        MapScreenTopComponent(
            routAction = routAction,
            owner = mapViewModel.mapInfo.owner
        )
        Spacer(modifier = Modifier.height(560.dp))
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(end = 10.dp),
            horizontalArrangement = Arrangement.End,
            verticalAlignment = Alignment.Bottom
        ) {
            FloatingAddButton(
                onClick = { routAction.navToRout(SquadMapNavigation.SEARCH_STORE_FOR_ADD) }
            )
        }
        Spacer(modifier = Modifier.height(10.dp))
        StoreList(
            onClick = { lat, long ->
                mapViewModel.setPoint(lat, long)
            },
            stores = mapViewModel.mapInfo.store
        )
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
                    modifier = Modifier.padding(start = 90.dp, end = 10.dp, top = 15.dp),
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
            .padding(start = 15.dp, top = 5.dp, end = 15.dp, bottom = 5.dp),
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
        Surface(
            modifier = Modifier.fillMaxSize()
        ) {
            StoreMapScreen(
                routAction = SquadMapRoutAction(rememberNavController()),
                mapViewModel = hiltViewModel()
            )
        }
    }
}


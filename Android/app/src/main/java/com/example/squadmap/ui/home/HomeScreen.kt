package com.example.squadmap.ui.home

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.squadmap.data.model.AllMap
import com.example.squadmap.ui.navigation.SquadMapNavigation
import com.example.squadmap.ui.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.Main
import com.example.squadmap.ui.theme.SquadMapTheme
import com.example.squadmap.ui.search.SearchButton

val mapList = listOf<AllMap>(
    AllMap("1F389", "스쿼드 지도", "로니", 6),
    AllMap("1F389", "스쿼드 지도", "로니", 6),
    AllMap("1F389", "스쿼드 지도", "로니", 6),
    AllMap("1F389", "스쿼드 지도", "로니", 6),
    AllMap("1F389", "스쿼드 지도", "로니", 6),
    AllMap("1F389", "스쿼드 지도", "로니", 6),
    AllMap("1F389", "스쿼드 지도", "로니", 6),
    AllMap("1F389", "스쿼드 지도", "로니", 6),
    AllMap("1F389", "스쿼드 지도", "로니", 6),
    AllMap("1F389", "스쿼드 지도", "로니", 6)
)

val groupMapList = listOf<AllMap>(
    AllMap("1F389", "스쿼드 지도", "머핀", 6),
    AllMap("1F389", "스쿼드 지도", "퍼니", 6),
)

fun getMapList(selectedType: MapType?) = when(selectedType) {
    MapType.GROUP -> {
        groupMapList
    }
    else -> {
        mapList
    }
}
@OptIn(ExperimentalMaterialApi::class)
@Composable
fun HomeScreen(routAction: SquadMapRoutAction) {
    val selectedType: MutableState<MapType?> = mutableStateOf(MapType.OPEN)
    val mapList = mutableStateOf(mapList)
    Scaffold(
        topBar = {
            TopAppbar(routAction)
        }
    ) { paddingValue ->
        Column {
            ChipGroup(
                types = getAllMapTypes(),
                selectedType = selectedType.value,
                onSelectedChanged = {
                    selectedType.value = getMapType(it)
                    mapList.value = getMapList(selectedType.value)
                }
            )
            GridListView(paddingValue = paddingValue,list = mapList.value, routAction = routAction)
        }
    }
}

@Composable
fun GridListView(paddingValue : PaddingValues, list: List<AllMap>, routAction: SquadMapRoutAction) {
    LazyVerticalGrid(
        modifier = Modifier
            .padding(paddingValue)
            .padding(top = 10.dp)
            .fillMaxWidth(),
        columns = GridCells.Adaptive(minSize = 190.dp)
    ) {
        items(items = list,
            itemContent = { item ->
            CardView(item = item, routAction = routAction)
        }
        )
    }
}

@Composable
fun CardView(
    item: AllMap,
    routAction: SquadMapRoutAction
) {
    Card(
        modifier = Modifier
            .width(200.dp)
            .height(200.dp)
            .padding(10.dp)
            .clickable { routAction.navToRout(SquadMapNavigation.STORE_LIST) },
        shape = RoundedCornerShape(50.dp),
        backgroundColor = Color.White,
        elevation = 10.dp
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = String(Character.toChars(item.emoji.toLong(16).toInt())),
                fontSize = 40.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 20.dp)
            )
            Text(
                text = item.title,
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 10.dp)
            )
            Text(
                text = "${item.shareCount}명과 공유",
                fontSize = 12.sp,
                modifier = Modifier.padding(top = 10.dp),
                fontWeight = FontWeight.Light
            )
            Text(
                text = item.host,
                fontSize = 12.sp,
                textAlign = TextAlign.End,
                color = Color.Gray,
                modifier = Modifier.padding(top = 10.dp)
            )
        }
    }
}

@Composable
private fun TopAppbar(routAction: SquadMapRoutAction) {
    TopAppBar(
        elevation = 4.dp,
        title = {
            Text("SquarMap")
        },
        backgroundColor = Main,
        actions = {
            SearchButton(
                routAction = routAction,
                rout = SquadMapNavigation.SEARCH_SCREEN
            )
        }
    )
}


@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    SquadMapTheme {

    }
}
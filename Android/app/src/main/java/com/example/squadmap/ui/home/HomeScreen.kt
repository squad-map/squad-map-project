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
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.data.model.AllMap
import com.example.squadmap.ui.TopAppbar
import com.example.squadmap.ui.common.navigation.SquadMapNavigation
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.SquadMapTheme

@Composable
fun HomeScreen(
    routAction: SquadMapRoutAction,
    homeViewModel: HomeViewModel = viewModel()
) {
    Scaffold(
        topBar = {
            TopAppbar(
                routAction = routAction,
                isSearchVisible = true,
                isAddVisible = false
            )
        }
    ) { paddingValue ->
        Column {
            ChipGroup(
                types = getAllMapTypes(),
                selectedType = homeViewModel.selectedTypeState.value,
                onSelectedChanged = {
                    homeViewModel.selectedTypeState.value = getMapType(it)
                    homeViewModel.mapListState.value = homeViewModel.getMapList(homeViewModel.selectedTypeState.value)
                }
            )
            GridListView(paddingValue = paddingValue,list = homeViewModel.mapListState.value, routAction = routAction)
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
        elevation = 10.dp,
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

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    SquadMapTheme {
        HomeScreen(routAction = SquadMapRoutAction(rememberNavController()))
    }
}
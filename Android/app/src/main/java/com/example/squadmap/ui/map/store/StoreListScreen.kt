package com.example.squadmap.ui.map.store

import android.graphics.Color.parseColor
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.R
import com.example.squadmap.data.model.StoreInfo
import com.example.squadmap.ui.TopAppbar
import com.example.squadmap.ui.common.NavigationButton
import com.example.squadmap.ui.common.navigation.SquadMapNavigation
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.map.MapViewModel
import com.example.squadmap.ui.theme.SquadMapTheme

@Composable
fun StoreListView(
    routAction: SquadMapRoutAction,
    mapViewModel : MapViewModel = hiltViewModel()
) {
    Scaffold(
        topBar = {
            TopAppbar(
                routAction = routAction,
                title = "등록된 매장",
                isSearchVisible = true,
                isAddVisible = true,
                navigationIcon = {
                    NavigationButton(icon = Icons.Filled.ArrowBack) {
                        routAction.back
                    }
                }
            )
        }
    ) {
        Box(
            modifier = Modifier.fillMaxSize()
        ) {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(15.dp)
            ) {
                items(
                    items = mapViewModel.mapInfo.store,
                    itemContent = { item ->
                        StoreItem(item = item, routAction)
                    }
                )
            }
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                Spacer(modifier = Modifier
                    .fillMaxWidth()
                    .height(700.dp))
                MapButton(routAction = routAction)
            }
        }
    }
}

@Composable
fun MapButton(routAction: SquadMapRoutAction) {
    Button(
        onClick = { routAction.navToRout(SquadMapNavigation.MAP_VIEW)},
        colors = ButtonDefaults.outlinedButtonColors(
            backgroundColor = Color.White
        ),
        shape = CircleShape
    ) {
        Image(
            painter = painterResource(id = R.drawable.ic_my_map),
            contentDescription = "지도",
            modifier = Modifier.padding(start = 7.dp)
        )
        Text(
            text = "지도 열기",
            color = Color.Gray,
            modifier = Modifier.padding(start = 5.dp, end = 7.dp)
        )
    }
}

@Composable
fun StoreItem(item: StoreInfo, routAction: SquadMapRoutAction) {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .padding(5.dp)
            .clickable {
                routAction.navToRout(SquadMapNavigation.WEB)
            },
        color = Color.White,
        elevation = 10.dp
    ) {
        Column {
            Row {
                Text(
                    text = item.title,
                    color = Color.Black,
                    fontWeight = FontWeight.Bold,
                    fontSize = 15.sp,
                    modifier = Modifier.padding(start = 10.dp, top = 10.dp)
                )
                Text(
                    text = item.category.name,
                    color = Color(parseColor(item.category.color)),
                    modifier = Modifier
                        .padding(end = 10.dp, top = 10.dp)
                        .fillMaxWidth(),
                    fontWeight = FontWeight.Bold,
                    fontSize = 12.sp,
                    textAlign = TextAlign.End
                )
            }
            Text(
                text = item.address,
                color = Color.Gray,
                modifier = Modifier.padding(start = 10.dp, top = 10.dp),
                fontSize = 11.sp
            )
            Text(
                text = item.description,
                color = Color.Gray,
                modifier = Modifier.padding(start = 10.dp, top = 10.dp, bottom = 10.dp),
                fontSize = 11.sp
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun StoreListPreview() {
    SquadMapTheme {
        StoreListView(
            routAction = SquadMapRoutAction(rememberNavController())
        )
    }
}
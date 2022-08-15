package com.example.squadmap.ui.home

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.data.model.AllMap
import com.example.squadmap.ui.search.SearchScreen
import com.example.squadmap.ui.theme.MainGreen
import com.example.squadmap.ui.theme.SquadMapTheme
import com.example.squadmap.ui.utils.SearchButton

val list = listOf<AllMap>(
    AllMap("스쿼드 지도", "로니", 6),
    AllMap("스쿼드 지도", "로니", 6),
    AllMap("스쿼드 지도", "로니", 6),
    AllMap("스쿼드 지도", "로니", 6),
    AllMap("스쿼드 지도", "로니", 6)
)

@Composable
fun HomeScreen() {
    val navGraph = rememberNavController()

    Scaffold(
        topBar = {
            TopAppbar()
        }
    ) {
        LazyColumn(
            modifier = Modifier
                .padding(it)
                .fillMaxSize()
        ) {
            items(items = list, itemContent = { item ->
                CardView(item = item)
            })
        }
    }
}

@Composable
fun CardView(item: AllMap) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(200.dp)
            .padding(10.dp),
        shape = RoundedCornerShape(50.dp),
        backgroundColor = Color(238, 238, 238, 1)
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = item.title,
                fontSize = 25.sp,
                fontWeight = FontWeight.Bold,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 10.dp)
            )
            Spacer(modifier = Modifier
                .fillMaxWidth()
                .height(20.dp))
            Text(
                text = item.host,
                fontSize = 14.sp,
                textAlign = TextAlign.Start,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(start = 20.dp)
            )
        }
    }
}

@Composable
private fun TopAppbar() {
    TopAppBar(
        elevation = 4.dp,
        title = {
            Text("SquarMap")
        },
        backgroundColor = MainGreen,
        navigationIcon = {
            IconButton(onClick = {/* Do Something*/ }) {
                Icon(Icons.Filled.ArrowBack, null)
            }
        },
        actions = {
            SearchButton {

            }
        }
    )
}



@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    SquadMapTheme {
        HomeScreen()
    }
}
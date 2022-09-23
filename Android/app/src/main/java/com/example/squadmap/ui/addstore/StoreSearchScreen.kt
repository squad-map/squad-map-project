package com.example.squadmap.ui.addstore

import android.text.Html
import android.widget.Toast
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.common.logger
import com.example.squadmap.data.model.ResultStore
import com.example.squadmap.data.model.StoreSearchData
import com.example.squadmap.ui.TopAppbar
import com.example.squadmap.ui.common.NavigationButton
import com.example.squadmap.ui.common.UiState
import com.example.squadmap.ui.common.navigation.SquadMapNavigation
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.Gray
import com.example.squadmap.ui.theme.Main
import com.example.squadmap.ui.theme.SquadMapTheme
import kotlinx.coroutines.flow.collect

// 검색 버튼 달기
@Composable
fun StoreSearchScreen(
    routAction: SquadMapRoutAction,
    viewModel: AddStoreViewModel
) {
    val result = viewModel.searchResult.collectAsState().value
    val size = remember {
        result._data?.size
    }
    Scaffold(
        topBar = {
            TopAppbar(
                routAction = routAction,
                title = "장소 찾기",
                isSearchVisible = false,
                isAddVisible = false,
                navigationIcon = {
                    NavigationButton(icon = Icons.Filled.Close) {
                        routAction.back
                    }
                }
            )
        }
    ) {
        Column {
            Text(
                text = "장소 검색",
                fontSize = 16.sp,
                modifier = Modifier.padding(start = 10.dp, top = 10.dp),
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "추천하고 싶은 장소를 찾아보세요!",
                fontSize = 12.sp,
                modifier = Modifier.padding(start = 10.dp)
            )
            Spacer(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(10.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.Center
            ) {
                OutlinedTextField(
                    value = viewModel.query.value,
                    onValueChange = viewModel::updateQuery,
                    modifier = Modifier
                        .width(310.dp)
                        .padding(start = 10.dp, end = 10.dp),
                    shape = RoundedCornerShape(20),
                    placeholder = {
                        Text(text = "상호명을 검색해주세요.")
                    }
                )
                Button(
                    shape = RoundedCornerShape(30),
                    modifier = Modifier.width(80.dp).height(60.dp),
                    enabled = viewModel.query.value != "",
                    onClick = { viewModel.search() },
                    colors = ButtonDefaults.buttonColors(backgroundColor = Color(Main.value))
                ) {
                    Text(text = "검색")
                }
            }
            Spacer(
                modifier = Modifier
                    .height(10.dp)
            )
            when(result) {
                is UiState.Success -> {
                    LazyColumn {
                        itemsIndexed(result.data) { index, item ->
                            if (size != null) {
                                if(index == size - 2) {
                                    viewModel.search()
                                }
                            }
                            SearchResults(
                                item = item,
                                routAction = routAction
                            )
                        }
                    }
                }
                is UiState.Error -> {
                    Toast.makeText(LocalContext.current, "데이터를 불러오지 못했습니다.", Toast.LENGTH_SHORT).show()
                }
                else -> {

                }
            }
        }
    }
}

@Composable
fun SearchResults(item: ResultStore, routAction: SquadMapRoutAction) {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .padding(5.dp)
            .clickable {
                routAction.navToWebView(SquadMapNavigation.WEB, item.link)
            },
        color = Color.White,
        elevation = 10.dp
    ) {
        Column {
            Text(
                text = item.title.replace("<b>", "").replace("</b>",""),
                color = Color.Black,
                fontWeight = FontWeight.Bold,
                fontSize = 15.sp,
                modifier = Modifier.padding(start = 10.dp, top = 10.dp)
            )
            Text(
                text = item.address,
                color = Color.Gray,
                modifier = Modifier.padding(start = 10.dp, top = 5.dp),
                fontSize = 11.sp
            )
            Text(
                text = item.roadAddress,
                color = Color.Gray,
                modifier = Modifier.padding(start = 10.dp, top = 5.dp),
                fontSize = 11.sp
            )
            Text(
                text = item.telephone,
                color = Color.Gray,
                modifier = Modifier.padding(start = 10.dp, top = 5.dp),
                fontSize = 11.sp
            )
            Text(
                text = item.description,
                color = Color.Gray,
                modifier = Modifier.padding(start = 10.dp, top = 5.dp, bottom = 10.dp),
                fontSize = 11.sp
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun DefaultPreview() {
    SquadMapTheme {
//        StoreSearchScreen(
//            SquadMapRoutAction(rememberNavController()),
//            hiltViewModel()
//        )
        Button(
            shape = RoundedCornerShape(30),
            modifier = Modifier.width(80.dp).height(50.dp),
            enabled = true,
            onClick = { logger("") },
            colors = ButtonDefaults.buttonColors(backgroundColor = Color(Main.value))
        ) {
            Text(text = "검색")
        }
    }
}
package com.example.squadmap.ui.addstore

import android.widget.Toast
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.R
import com.example.squadmap.common.logger
import com.example.squadmap.data.model.StoreSearchData
import com.example.squadmap.ui.TopAppbar
import com.example.squadmap.ui.common.NavigationButton
import com.example.squadmap.ui.common.UiState
import com.example.squadmap.ui.common.navigation.SquadMapNavigation
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.Main
import com.example.squadmap.ui.theme.SquadMapTheme
import net.daum.mf.map.api.MapPoint
import net.daum.mf.map.api.MapView

@Composable
fun StoreSearchScreen(
    routAction: SquadMapRoutAction,
    viewModel: AddStoreViewModel
) {
    val result = viewModel.searchResult.collectAsState().value
    val addStoreInfo = viewModel.addStore.collectAsState().value
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
                modifier = Modifier.padding(start = 15.dp, top = 10.dp),
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "추천하고 싶은 장소를 찾아보세요!",
                fontSize = 12.sp,
                modifier = Modifier.padding(start = 15.dp)
            )
            Spacer(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(10.dp)
            )
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.Center
            ) {
                OutlinedTextField(
                    value = viewModel.query.value,
                    onValueChange = viewModel::updateQuery,
                    modifier = Modifier
                        .width(310.dp)
                        .padding(end = 10.dp),
                    shape = RoundedCornerShape(20),
                    placeholder = {
                        Text(text = "상호명을 검색해주세요.")
                    }
                )
                SearchButton(
                    onClick = viewModel::search,
                    isEnable = viewModel.query.value != ""
                )
            }
            Spacer(
                modifier = Modifier
                    .height(10.dp)
            )
            Text(
                text = "추가하고 싶은 장소",
                modifier = Modifier.padding(start = 15.dp),
                fontWeight = FontWeight.Bold
            )
            when(addStoreInfo) {
                is UiState.Success -> {
                    StoreInfo(
                        item = addStoreInfo.data
                    )
                }
                is UiState.Error -> {
                    StoreInfo()
                    Toast.makeText(LocalContext.current, "장소 선택에 실패하였습니다.", Toast.LENGTH_SHORT).show()
                }
                else -> {
                    StoreInfo()
                }
            }
            Spacer(
                modifier = Modifier
                    .height(10.dp)
            )
            Divider()
            Box(
                modifier = Modifier.fillMaxSize()
            ) {
                when (result) {
                    is UiState.Success -> {
                        LazyColumn {
                            items(result.data) { item ->
                                SearchResults(
                                    item = item,
                                    routAction = routAction,
                                    onClick = { viewModel.setAddStoreInfo(item) }
                                )
                            }
                        }
                    }
                    is UiState.Error -> {
                        Toast.makeText(LocalContext.current, "데이터를 불러오지 못했습니다.", Toast.LENGTH_SHORT)
                            .show()
                    }
                    else -> {

                    }
                }
                Column(
                    verticalArrangement = Arrangement.Bottom,
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(bottom = 20.dp)
                ) {
                    Button(
                        onClick = {
                            routAction.navToRout(SquadMapNavigation.ADD_STORE_DESCRIPTION)
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(start = 10.dp, end = 10.dp)
                            .height(50.dp),
                        enabled = addStoreInfo != UiState.Loading,
                        colors = ButtonDefaults.buttonColors(backgroundColor = Color(Main.value))
                    ) {
                        Text(text = "다음")
                    }
                }
            }
        }
    }
}

@Composable
fun StoreInfo(
    item: StoreSearchData? = null
) {
    if(item == null) {
        Text(
            text = "장소를 선택해주세요.",
            modifier = Modifier.padding(start = 15.dp),
            fontSize = 12.sp
        )
    } else {
        Column(
            modifier = Modifier.padding(start = 15.dp, top = 10.dp)
        ) {
            Text(
                text = item.name,
                color = Color.Black,
                fontWeight = FontWeight.Bold,
                fontSize = 15.sp,
            )
            Text(
                text = item.address.orEmpty(),
                color = Color.Gray,
                fontSize = 11.sp
            )
            Text(
                text = item.roadAddress.orEmpty(),
                color = Color.Gray,
                fontSize = 11.sp
            )
            Text(
                text = item.telephone.orEmpty(),
                color = Color.Gray,
                fontSize = 11.sp
            )
            Text(
                text = item.category.orEmpty(),
                color = Color.Gray,
                fontSize = 11.sp
            )
        }
    }
}

@Composable
fun SearchButton(
    onClick: () -> Unit,
    isEnable: Boolean
) {
    Button(
        shape = RoundedCornerShape(30),
        modifier = Modifier
            .width(80.dp)
            .height(57.dp),
        enabled = isEnable,
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(backgroundColor = Color(Main.value))
    ) {
        Text(text = "검색")
    }
}

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun SearchResults(
    item: StoreSearchData,
    routAction: SquadMapRoutAction,
    onClick: () -> Unit
) {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .padding(5.dp)
            .clickable {
                routAction.navToWebView(SquadMapNavigation.WEB, item.link)
            },
        color = Color.White,
        elevation = 10.dp,
        onClick = onClick
    ) {
        StoreInfo(item = item)
    }
}

@Preview(showBackground = true)
@Composable
private fun DefaultPreview() {
    SquadMapTheme {
        StoreSearchScreen(
            routAction = SquadMapRoutAction(rememberNavController()),
            viewModel = hiltViewModel()
        )
    }
}
package com.example.squadmap.ui.addstore

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.ui.TopAppbar
import com.example.squadmap.ui.common.NavigationButton
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.Gray
import com.example.squadmap.ui.theme.SquadMapTheme
// 검색 버튼 달기
@Composable
fun StoreSearchScreen(
    routAction: SquadMapRoutAction,
    viewModel: AddStoreViewModel
) {
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
                        .fillMaxWidth()
                        .padding(start = 10.dp, end = 10.dp),
                    shape = RoundedCornerShape(20),
                    placeholder = {
                        Text(text = "상호명을 검색해주세요.")
                    }
                )
            }
            Spacer(
                modifier = Modifier
                    .height(10.dp)
            )
//            LazyColumn {
//                itemsIndexed(viewModel)
//            }
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun DefaultPreview() {
    SquadMapTheme {
        StoreSearchScreen(
            SquadMapRoutAction(rememberNavController()),
            viewModel()
        )
    }
}
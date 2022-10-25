package com.example.squadmap.ui.addstore

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Icon
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.squadmap.common.logger
import com.example.squadmap.ui.TopAppbar
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.SquadMapTheme

@Composable
fun StoreDescriptionScreen(
    routAction: SquadMapRoutAction,
    viewModel: AddStoreViewModel = hiltViewModel()
) {
    Scaffold(
        topBar = {
            TopAppbar(
                title = "장소 등록",
                routAction = routAction,
                isSearchVisible = false,
                isAddVisible = false,
                navigationIcon = {
                    Icon(
                        imageVector = Icons.Filled.ArrowBack,
                        contentDescription = "back"
                    )
                }
            )
        },
        modifier = Modifier.fillMaxSize()
    ) {
        Column(
            modifier = Modifier.verticalScroll(rememberScrollState())
        ) {
            Title("장소 설명")
            DescriptionInput(
                value = viewModel.description.value,
                onValueChange = viewModel::updateDescription
            )
            Title("카테고리")

        }
    }
}

@Composable
fun DescriptionInput(
    value: String,
    onValueChange: (String) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .fillMaxHeight(),
        verticalArrangement = Arrangement.Center,
    ) {
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = Modifier
                .fillMaxWidth()
                .height(300.dp)
                .padding(start = 10.dp, top = 10.dp, end = 10.dp, bottom = 10.dp),
            shape = RoundedCornerShape(5),
            placeholder = {
                Text(text = "당신의 이야기를 들려주세요.")
            }
        )
    }
}

@Composable
fun Title(
    title: String = ""
) {
    Text(
        text = title,
        modifier = Modifier
            .fillMaxWidth()
            .padding(start = 18.dp, end = 10.dp, top = 10.dp),
        fontSize = 22.sp
    )
}

@Preview(showBackground = false)
@Composable
fun DefaultScreen() {
    SquadMapTheme {
        Scaffold {
            Column(
                modifier = Modifier.verticalScroll(rememberScrollState())
            ) {
                Title("장소 설명")
                DescriptionInput(
                    ""
                ) {
                    logger(it)
                }
                Title("카테고리")
            }
        }
    }
}
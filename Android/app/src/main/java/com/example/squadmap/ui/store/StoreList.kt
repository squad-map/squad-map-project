package com.example.squadmap.ui.store

import android.graphics.Color.parseColor
import android.view.View
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.squadmap.data.model.CategoryInfo
import com.example.squadmap.data.model.StoreInfo
import com.example.squadmap.ui.navigation.SquadMapNavigation
import com.example.squadmap.ui.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.SquadMapTheme

private val list = listOf<StoreInfo>(
    StoreInfo(
        "테일러커피",
        CategoryInfo(
            "카페",
            "#ff0000",
            "카페"
        ),
        "서울 마포구 잔다리로",
        "맛있는카페"
    ),
    StoreInfo(
        "테일러커피",
        CategoryInfo(
            "카페",
            "#ff0000",
            "카페"
        ),
        "서울 마포구 잔다리로",
        "맛있는카페"
    ),
    StoreInfo(
        "테일러커피",
        CategoryInfo(
            "카페",
            "#ff0000",
            "카페"
        ),
        "서울 마포구 잔다리로",
        "맛있는카페"
    ),
    StoreInfo(
        "테일러커피",
        CategoryInfo(
            "카페",
            "#ff0000",
            "카페"
        ),
        "서울 마포구 잔다리로",
        "맛있는카페"
    )
)

@Composable
fun StoreListView(
    routAction: SquadMapRoutAction
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxWidth()
            .padding(15.dp)
    ) {
        items(
            items = list,
            itemContent = { item ->
                StoreItem(item = item, routAction)
            }
        )
    }
}

@Composable
fun StoreItem(item: StoreInfo, routAction: SquadMapRoutAction) {
    Surface(
        modifier = Modifier.
        fillMaxWidth().
        padding(5.dp).
        clickable {
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
                    modifier = Modifier.padding(end = 10.dp,top = 10.dp).fillMaxWidth(),
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
fun DefaultPreview() {
    SquadMapTheme {

    }
}
package com.example.squadmap.di

import com.example.squadmap.data.repository.*
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Singleton
    @Binds
    abstract fun bindStoreSearchRepository(
        storeSearchRepositoryImpl: StoreSearchRepositoryImpl
    ): StoreSearchRepository

    @Singleton
    @Binds
    abstract fun bindLoginRepository(
        loginRepositoryImpl: LoginRepositoryImpl
    ): LoginRepository

    @Singleton
    @Binds
    abstract fun bindProfileRepository(
        profileRepositoryImpl: ProfileRepositoryImpl
    ): ProfileRepository

    @Singleton
    @Binds
    abstract fun bindMyMapRepository(
        myMapRepositoryImpl: MyMapRepositoryImpl
    ): MyMapRepository

}
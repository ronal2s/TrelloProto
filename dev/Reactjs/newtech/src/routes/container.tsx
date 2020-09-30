import React, { useState } from 'react';
import { Divider, List } from '@material-ui/core';
import {
  BrowserRouter as Router, Switch, Route,
} from "react-router-dom";
import Home from '../routes/home';
//Custom components
import CustomAppBar from '../components/appbar';
import CustomLink from '../components/listItem';
import CustomDrawer from '../components/drawer';
import { isMobile } from '../utils/functions';
import { COLORS, Routes } from '../utils/enums';
//Custom styles
import { RowView, NavigationView, ContentView } from '../globalStyles';

const Header = () => {
  return (
    <>
      <Divider />
      <div style={{ backgroundColor: COLORS.PRIMARY_DARK, height: 100 }} >
        <h1 style={{ color: "white", textAlign: "center" }} >Logo</h1>
      </div>
    </>
  )
}

function App() {

  const [drawer, setDrawer] = useState(!isMobile());
  const [actualRoute, setRoute] = useState("");

  const handleDrawer = () => {
    setDrawer(!drawer)
  }

  const closeDrawer = () => setDrawer(false);

  const onClickItem = (name: string) => {
    setRoute(name);
  }



  return (
    <Router>
      < >
        <RowView >
          <CustomDrawer open={drawer} closeDrawer={closeDrawer} >
            <Header />
            <Divider />
            <List>
              <CustomLink title="Home" icon="mail" iconColor="white" nameView={Routes.Screen1} actualRoute={actualRoute} onClick={onClickItem} />
            </List>
          </CustomDrawer>
          <NavigationView>
            <CustomAppBar title="Home" onMenuPress={handleDrawer} drawerOpened={drawer} />
            <ContentView>
              <Switch>
                <Route path="/" exact component={Home} />
              </Switch>
            </ContentView>
          </NavigationView>
        </RowView>
      </>
    </Router>
  );
}

export default App;

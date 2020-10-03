import styled from '@emotion/styled'
import { Drawer_size } from '../utils/constants';
import { COLORS } from '../utils/enums';


const RowView = styled.div({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
})

const DrawerView = styled.div({
    width: Drawer_size
})

const NavigationView = styled.div({
    flex: 1,
})

const ContentView = styled.div({
    padding: 10
})

const ContentCard = styled.div((props: any) => ({
    minHeight: props.height ? props.height : 250, width: 250,
    marginRight: 30, marginBbottom: 10, padding: "1rem", float: "left",
    backgroundColor: "#ebecf0", borderRadius: 10, fontWeight: "bold"
}))

const CartContainer = styled.div((props: any) => ({
    alignItems: 'stretch',
    alignContent: 'stretch',
}))

const CornerFab = styled.div(() => ({
    position: "absolute", right: 10, bottom: 10
}))


const Tag = styled.div((props: any) => ({
    padding: 5, height: 15, backgroundColor: props.color ? props.color : COLORS.PRIMARY, borderRadius: 25,
    width: props.width, color: "white", display: "flex", justifyContent: "center", alignItems: "center", float: props.float,
    fontWeight: 100, marginRight: 10
}))



export {
    RowView,
    DrawerView,
    NavigationView,
    ContentView,
    ContentCard,
    Tag, CornerFab,
    CartContainer
}

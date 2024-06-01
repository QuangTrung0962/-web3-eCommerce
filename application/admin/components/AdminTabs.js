import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, Typography, Box, useMediaQuery, Grid } from '@mui/material';
import axios from 'axios';
import { VscGraph } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaShippingFast } from 'react-icons/fa';
import { TbReportMoney } from 'react-icons/tb';
import Widget from './Widget';
import { Web3Button, useContract, useContractRead } from '@thirdweb-dev/react';
import {
    CONTRACT_AUTH_ADDRESS,
    CONTRACT_ORDER_ADDRESS,
    CONTRACT_PRODUCT_ADDRESS,
    SDK,
} from '../constants/constant';
// import OrderTable from './Tables/OrderTable';
// import ProductChart from './Charts/ProductChart';
// import UserTable from './Tables/UserTable';
// import ProductTable from './Tables/ProductTable';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children} </Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ user, setUser, getUser }) {
    const [value, setValue] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [numberUser, setNumberUser] = useState(0);
    const [numberProduct, setNumberProduct] = useState(0);
    const [numberOrder, setNumberOrder] = useState(0);
    const [paymentData, setPaymentData] = useState([]);

    // const { contract: authenContract } = useContract(CONTRACT_AUTH_ADDRESS);
    // const { contract: orderContract } = useContract(CONTRACT_ORDER_ADDRESS);

    useEffect(() => {
        getNumberData();
    }, []);

    const getNumberData = async () => {
        const authenContract = await SDK.getContract(CONTRACT_AUTH_ADDRESS);
        const orderContract = await SDK.getContract(CONTRACT_ORDER_ADDRESS);

        const user = await authenContract.call('getAllUser');
        setNumberUser(user.length + 5);
        const revenue = await orderContract.call('getRevenue');
        setRevenue(parseInt(revenue));
        const order = await orderContract.call('getOrdersCount');
        setNumberOrder(parseInt(order));
        const product = await orderContract.call('getNumberProduct');
        setNumberProduct(parseInt(product));
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const totalRevenue = paymentData.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        // <h1>T</h1>
        <Box sx={{ width: '100%' }}>
            {/* Hiện các thông số */}
            <Grid container spacing={2} direction={isSmallScreen ? 'column' : 'row'} padding={1}>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget
                        numbers={revenue}
                        heading="Doanh thu"
                        color="#9932CC"
                        icon={<TbReportMoney />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget
                        numbers={numberProduct}
                        heading="Sản phẩm"
                        color="#FFC300"
                        icon={<AiOutlineShoppingCart />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget
                        numbers={numberUser}
                        heading="Khách hàng"
                        color="#FF69B4"
                        icon={<CgProfile />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget
                        numbers={numberOrder}
                        heading="Đặt hàng"
                        color="#1f77b4"
                        icon={<FaShippingFast />}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

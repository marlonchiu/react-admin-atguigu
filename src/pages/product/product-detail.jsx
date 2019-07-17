import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import { BASE_IMG_URL } from '../../utils/constants'
import { Card, Icon, List} from 'antd'
const { Item } = List

class ProductDetail extends Component {

    render() {
        // 读取携带过来的state数据
        console.log(this.props.location.state.product);
        const {name, desc, price, detail, imgs} = this.props.location.state.product
        const title = (
            <span>
                <LinkButton>
                  <Icon
                      type='arrow-left'
                      style={{marginRight: 10, fontSize: 20}}
                      onClick={() => this.props.history.goBack()}
                  />
                </LinkButton>
            <span>商品详情</span>
            </span>
        )

        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span>123元</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span>
                            {/*{*/}
                                {/*imgs.map(img => {*/}
                                    {/*<img*/}
                                        {/*key={img}*/}
                                        {/*src={BASE_IMG_URL + img}*/}
                                        {/*className="product-img"*/}
                                        {/*alt="img"*/}
                                    {/*/>*/}
                                {/*})*/}
                            {/*}*/}
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{__html: detail}}></span>
                    </Item>
                </List>
            </Card>
         );
    }
}
 
export default ProductDetail;
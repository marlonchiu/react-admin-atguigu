import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import { Card, Icon, List} from 'antd'
const { Item } = List


class ProductDetail extends Component {


    render() {

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
                        <span>123</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>123</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>123元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span>123元</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span>123元</span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{__html: '<h1 style="color: red">商品</h1>'}}></span>
                    </Item>
                </List>
            </Card>
         );
    }
}
 
export default ProductDetail;
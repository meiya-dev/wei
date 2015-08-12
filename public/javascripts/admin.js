/**
 * @author juhua
 */


(function () {

	var app = {};

	app.sales = {
		url: '/sales',
		data: [],
		_sales: function (type, data) {

			var param = {
				url: this.url,
				type: type || 'get',
				dataType: 'json'
			};

			if (data && typeof data === 'object') {
				param.data = data;
			}

			return $.ajax(param)
			.done(function (res) {
			}.bind(this))
		},
		render: function () {

			var self = this;

			var Item = React.createClass({
				render: function () {
					return (
						<div className="item">
						<div className="content">
						  <div className="header">{this.props.data.Product.name}</div>
						  <div className="description">
						    <p>暂无详情</p>
						  </div>
						</div>
						</div>
					)
				}
			});

			var Sales = self.Sales = React.createClass({
				getInitialState: function () {
					return {
						data: self.data
					}
				},

				render: function () {
					var self = this;
					return (
						<div className="ui divided items">
						{
							this.state.data.map(function (item) {
								return (<Item data={item}/>);
							})
						}
						</div>
					);
				}
			});

			React.render(
				<Sales />,
				document.getElementById('J_Sales')
			);

		},
		init: function () {
			this._sales()
			.done(function (res) {
				this.data = res.reverse();
				this.render();
			}.bind(this));
		}
	};

	app.orders = {
		url: '/orders',
		_$modal: $('.orders.modal'),
		_orders: function () {
			return $.ajax({
				url: this.url,
				type: 'get',
				dataType: 'json'
			})
		},
		countOrders: function (data) {
			var _counts = {};
			var ret = [];
			data.map(function (item, index) {
				var product = item.Product;
				var name = product.name;
				if (!_counts[name]) {
					_counts[name] = 0;
				}
				_counts[name]++
			});

			for (var key in _counts) {
				ret.push({
					name: key,
					count: _counts[key]
				});
			}

			return ret;
		},
		listRender: function (res, dom) {

			var self = this;

			var List = React.createClass({
				getInitialState: function () {
					return {
						data: res,
						counts: self.countOrders(res)
					}
				},
				render: function () {
					return (
						<div style={{maxHeight: '300px',overflowY: 'auto'}}>
						{
							this.state.counts.map(function (item) {
								return (<div>{item.name} x {item.count}</div>);
							})
						}
						{<br/>}
						{
							this.state.data.map(function (item) {
								return (<div>{item.User.name} 点了 {item.Product.name}</div>);
							})
						}
						</div>
					);
				}
			});

			React.render(
				<List />,
				dom
			);
		},
		btnRender: function () {

			var self = this;
			var $modal = self._$modal;

			var Orders = React.createClass({
				handleClickOrders: function () {
					$modal.modal('show');
					self._orders().done(function (res) {
						self.listRender(res, $modal.find('#J_Orders')[0]);
					})
				},
				render: function () {
					return (
						<div className="fluid ui button green" 
						onClick={this.handleClickOrders}>
						{this.props.text}</div>
					)
				}
			});

			React.render(
				<Orders text='查看今日订单'/>,
				document.getElementById('J_OrdersBtn')
			);

		},
		init: function () {
			this.btnRender();
		}
	};

	app.add = function () {

		var that = this;

		var Add = React.createClass({
			handleClickAdd: function () {
				$('.add.modal').modal('show');
			},
			render: function () {
				return (
					<div className="fluid ui button primary" 
					onClick={this.handleClickAdd}>
					{this.props.text}</div>
				)
			}
		});

		React.render(
			<Add text='添加新菜色'/>,
			document.getElementById('J_AddBtn')
		);

		$('.add.modal').modal({
			onApprove: function () {
				var $this = $(this);
				var val = $this.find('#J_ProductName').val();

				if (val) {
					that.sales._sales('post', {
						product_name: val
					}).done(function () {
						that.sales.init()
					})
				} else {
					return false
				}
			}
		});

	};

	app.init = function () {
		this.sales.init();
		this.orders.init();
		this.add();
	};

	app.init();

}())

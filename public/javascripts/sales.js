/**
 * @author juhua
 */


(function () {

	var app = {};

	app.sales = {
		url: '/sales',
		data: [],
		_sales: function (type) {
			return $.ajax({
				url: this.url,
				type: type || 'get',
				dataType: 'json'
			}).done(function (res) {
				this.data = res;
			}.bind(this))
		},
		render: function () {

			var that = this;

			var Item = React.createClass({
				confirm: function (e) {
					var data = this.props.data;
					var id = data.Product.id;

					app.orders._orders({
						product_id: id
					});
				},
				render: function () {
					return (
						<div className="item">
						<div className="image">
						  <img src="../images/image.png"/>
						</div>
						<div className="content">
						  <div className="header">{this.props.data.Product.name}</div>
						  <div className="meta">
						    <span className="price">¥5</span>
						  </div>
						  <div className="description">
						    <p>暂无详情</p>
						  </div>
						  <div className="extra">
						    <div className="ui right floated primary button small"
						    onClick={this.confirm}>
						      点餐
						    </div>
						  </div>
						</div>
						</div>
					)
				}
			});

			var Sales = React.createClass({
				getInitialState: function () {
					return {
						data: that.data
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
			.done(function () {
				this.render();
			}.bind(this));
		}
	};

	app.orders = {
		url: '/orders',
		_orders: function (type, param) {

			if (typeof type === 'object') {
				param = type;
				type = null;
			}

			return $.ajax({
				url: this.url,
				type: type || 'post',
				data: param,
				dataType: 'json'
			}).done(function (res) {
				$('.feedback.modal').modal('show');
			}.bind(this))
		}
	};

	app.init = function () {
		this.sales.init();
	};

	app.init();

}())

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

			var self = this;

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
						<div className="content">
						  <div className="header">{this.props.data.Product.name}</div>
						  <div className="meta">
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
			.done(function () {
				this.render();
			}.bind(this));
		}
	};

	app.orders = {
		url: '/orders',
		_$modal: $('.feedback.modal'),
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
			}).always(function (res) {
				status = res.status;
				var $modal = this._$modal;
				var $content = $modal.find('.content');
				if (status !== 200) {
					$content.text(res.responseText);
				} else {
					$content.text('点餐成功');
				}
				$modal.modal('show');
			}.bind(this))
		}
	};

	app.init = function () {
		this.sales.init();
	};

	app.init();

}())

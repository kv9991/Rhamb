import React, { Component } from 'react';

export default class Post extends Component {
	render() {
		return (
			<div><div className="col-lg-12">
				<section id="post">
					<div className="block">
						<div className="row">
							<div className="col-lg-8">
								<header id="post-header">
									<div className="meta">
										
									</div>
									<div className="image">
										<img src="https://cdn.aaronfagan.ca/uploads/blog-how-to-use-custom-web-fonts-on-your-website.jpg" alt="" />
										<div className="image-description">Фото взято из Photostock.com</div>
									</div>   
									<div className="row">
										<div className="col-md-4">
											<div className="user user-lg pd-10 flex clns a-cntr">
												<img src="https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg" />
												<div className="name"><a href="">Koryakovcev Ivan</a></div>
												<div className="bio">Веб-разработчик, любитель фундаментальных наук</div>
												<div className="link"><a href="#" className="btn btn-primary">Подписаться</a></div>
											</div>
										</div>
										<div className="col-md-8">
											<hgroup>
												<h1>Как использовать кастомные шрифты в вебе и не сойти с ума</h1>
												<div className="description">
													Бывало ли так, что вы видите на веб-странице картинки и оформление, но не видите текста — он появляется на пару (десятков) секунд позже? Это загружаются кастомные веб-шрифты. Объясняем, почему это происходит и как этого избежать.
												</div>
											</hgroup>
										</div>
									</div>
								</header>
								<div id="post-content">
									<div className="row">
										<div className="col-lg-12">

											<h5>Текст</h5>

										</div>
									</div>

									<div className="divider">
										<img src="file:///D:/www/rhamb/prototype/src/img/logo/logo-r-32.png" alt="" />
									</div>
									
									<div className="row">
										<div className="col-lg-6">
											<header>
												<div className="description">
													Автор
												</div>
											</header>
											<div className="user user-lg flex rows pd-in-10">
												<div>
													<img src="https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg" alt="" />
												</div>
												<div>
													<div className="name">
														Koryakovcev Ivan
													</div>
													<a href="#" className="btn btn-primary btn-xs">Подписаться</a>
												</div>
											</div>
								
										</div>
										<div className="col-lg-6">
											<header>
												<div className="description">
													Теги
												</div>
											</header>
											<ul className="tags">
												<li><a href="">Javascript</a></li>
												<li><a href="">React</a></li>
												<li><a href="">Angular</a></li>
												<li><a href="">Разработка</a></li>
												<li><a href="">SPA</a></li>
												<li><a href="">jQuery</a></li>
											</ul>
										</div>
									</div>


								</div>
							</div>
							<div className="col-lg-4">
								<div id="post-promo-wrapper">
									<div className="block" id="post-promo">
										<header>
											<div className="title">Спонсор материала</div>
										</header>
										<div className="promo">
											<div className="image"><img src="https://assets.servedby-buysellads.com/p/manage/asset/id/26626" alt="" /></div>
											<div className="title">Download Jupiter 5!</div>
											<div className="description">26,000 users can't be wrong. Join them and download Jupiter today.</div>
											<div className="button"><a href="" className="btn btn-default">Подробнее</a></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div className="row">
							<div className="col-lg-12">
								<header>
									<div className="title">
										Комметарии
									</div>
								</header>

								<div className="col-lg-6" id="comments">
									<article className="comment">
										<a className="comment-img" href="#non">
											<img src="https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg" alt="" width="50" height="50" />
										</a>
											
										<div className="comment-body">
											<div className="text">
											  <p>Мой первый комментарий</p>
											</div>
											<p className="attribution"><a href="#">Koryakovcev Ivan</a>, 2 часа назад</p>
										</div>
									</article>
									
									<article className="comment">
										<a className="comment-img" href="#non">
										<img src="https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg" alt="" width="50" height="50" />
										</a>
											
										<div className="comment-body">
											<div className="text">
											  <p>This is a much longer one that will go on for a few lines.</p>
											  <p>It has multiple paragraphs and is full of waffle to pad out the comment. Usually, you just wish these sorts of comments would come to an end.</p>
											</div>
										<p className="attribution">by <a href="#non">Joe Bloggs</a> at 2:23pm, 4th Dec 2012</p>
										</div>
									</article>
										
									<article className="comment">
										<a className="comment-img" href="#non">
										<img src="https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg" alt="" width="50" height="50" />
										</a>
											
										<div className="comment-body">
											<div className="text">
												<p>Originally from <a href="http://cssdeck.com/item/301/timeline-style-blog-comments#comment_289">cssdeck.com</a> this presentation has been updated 
												to looks more precisely to the facebook timeline</p>
											</div>
										<p className="attribution">by <a href="http://www.facebook.com/luky.TikTek">Luky Vj</a> at 2:44pm, 14th Apr 2012</p>
										</div>
									</article>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div></div>
		);
	}
}

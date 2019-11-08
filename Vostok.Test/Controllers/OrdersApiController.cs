using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vostok.Test.Models.Db;
using Vostok.Test.Models.Db.Dtos;
using Vostok.Test.Models.Dtos;
using Vostok.Test.Models.Repositories;

namespace Vostok.Test.Controllers
{
    [Produces("application/json")]
    [Route("api/orders")]
    public class OrdersApiController : Controller
    {
        private readonly OrderRepository _repository;
        public OrdersApiController(AppDbContext dbContext)
        {
            _repository = new OrderRepository(dbContext);
        }
        protected override void Dispose(bool disposing)
        {
            _repository.Dispose();

            base.Dispose(disposing);
        }
        [HttpGet, Route("list")]
        public List<OrderDto> GetOrderList()
        {
            return _repository.GetOrderList();
        }
        [HttpGet, Route("list/{id:Guid}")]
        public OrderDto GetOrder(Guid id)
        {
            return _repository.GetOrder(id);
        }
        [HttpPost, Route("create")]
        public OrderDto CreateOrder([FromBody] List<OrderItemDto> items)
        {
            return _repository.CreateOrder(items);
        }
        [HttpPost, Route("delete/{id:Guid}")]
        public Guid? DeleteOrder(Guid id)
        {
            return _repository.DeleteOrder(id);
        }
    }
}
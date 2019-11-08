using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vostok.Test.Models.Db;
using Vostok.Test.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Vostok.Test.Models.Repositories
{
    public class OrderRepository : IDisposable
    {
        private readonly AppDbContext _dbContext;
        public OrderRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Dispose()
        {
            _dbContext.Dispose();
        }

        public List<OrderDto> GetOrderList()
        {
            return _dbContext.Orders.Select(o => new OrderDto {
                Id = o.Id,
                Date = o.Date,
                Number = $"Number#{o.Number}",
                Status = (int) o.Status
            }).ToList();
        }

        public OrderDto GetOrder(Guid orderId)
        {
            return _dbContext.Orders
                .Include(o => o.Items)
                .Where(o => o.Id == orderId)
                .Select(o => new OrderDto
                {
                    Id = o.Id,
                    Date = o.Date,
                    Number = $"Number#{o.Number}",
                    Status = (int)o.Status,
                    Items = o.Items.Select(i => new OrderItemDto {
                        Id = i.Id,
                        Name = i.Name,
                        Price = i.Price,
                        Quantity = i.Quantity
                    }).ToList()
                }).SingleOrDefault();
        }

        public Guid? DeleteOrder(Guid orderId)
        {
            var _order = _dbContext.Orders
                .Include(o => o.Items)
                .SingleOrDefault(o => o.Id == orderId);

            if (_order != null)
            {
                foreach(var _item in _order.Items)
                    _dbContext.OrderItems.Remove(_item);
 
                _dbContext.Orders.Remove(_order);
                _dbContext.SaveChanges();

                return orderId;
            }
            return null;
        }

        public OrderDto CreateOrder(List<OrderItemDto> items)
        {
            var _count = _dbContext.Orders.Count();
            var _number = _count > 0 ? _dbContext.Orders.Max(o => o.Number) : 0;

            var _order = new Db.Dtos.Order
            {
                Id = Guid.NewGuid(),
                Number = ++_number,
                Date = DateTime.Now,
                Status = Db.Dtos.OrderStatus.InProgress,
                Items = new List<Db.Dtos.OrderItem>()
            };

            foreach(var item in items)
            {
                _order.Items.Add(new Db.Dtos.OrderItem
                {
                    Id = Guid.NewGuid(),
                    Name = item.Name,
                    Price = item.Price,
                    Quantity = item.Quantity
                });
            }

            _dbContext.Orders.Add(_order);
            _dbContext.SaveChanges();

            return new OrderDto {
                Id = _order.Id,
                Number = $"Number#{_order.Number}",
                Date = _order.Date,
                Status = (int)_order.Status,
                Items = _order.Items.Select(i => new OrderItemDto
                {
                    Id = i.Id,
                    Name = i.Name,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList()
            };
        }
    }
}

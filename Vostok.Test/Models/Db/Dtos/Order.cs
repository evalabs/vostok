using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vostok.Test.Models.Db.Dtos
{
    public class Order
    {
        public Guid Id { get; set; }
        public int Number { get; set; }
        public DateTime Date { get; set; }
        public OrderStatus Status { get; set; }
        public List<OrderItem> Items { get; set; }
    }
}

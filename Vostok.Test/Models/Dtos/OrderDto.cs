using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vostok.Test.Models.Dtos
{
    public class OrderDto
    {
        public Guid? Id { get; set; }
        public string Number { get; set; }
        public int? Status { get; set; }
        public DateTime? Date { get; set; }
        public List<OrderItemDto> Items { get; set; }
        public decimal Total
        {
            get
            {
                return Items != null ? Items.Sum(i => i.Total) : 0;
            }
        }
    }
}

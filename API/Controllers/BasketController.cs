using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStoreDataAccessLibrary;
using ReStoreModelLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Web;
using API.DTOs;
using API.Extensions;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreDbContext _context;

        public BasketController(StoreDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null)
                return NotFound();
            return basket.MapBasketToDto();
        }

        [HttpPost]
        // As long as the keys are named the exact same then ASP.NET knows to get 
        // the values from productId and quantity from the url query, so there is no
        // need to explicitly state [FromQuery] before the parameters!
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null)
                basket = CreateBasket();

            var product = await _context.Products.FindAsync(productId);

            if (product == null)
                return BadRequest(new ProblemDetails { Title = "Product not found" });

            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
                return CreatedAtAction("GetBasket", basket.MapBasketToDto());

            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null)
                return NotFound(new ProblemDetails { Title = "Basket not found" });

            var product = await _context.Products.FindAsync(productId);

            if (product == null)
                return NotFound(new ProblemDetails { Title = "Product not found" });

            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
                return Ok();

            return StatusCode(500, new ProblemDetails { Title = "Internal server error" });
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(b => b.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

        private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }        

    }
}

package fr.inti.apptest.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;

import fr.inti.apptest.domain.enumeration.OrderItemStatus;

/**
 * A OrderItem.
 */
@Document(collection = "order_item")
public class OrderItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Min(value = 0)
    @Field("quantity")
    private Integer quantity;

    @NotNull
    @DecimalMin(value = "0")
    @Field("total_price")
    private BigDecimal totalPrice;

    @NotNull
    @Field("status")
    private OrderItemStatus status;

    @DBRef
    @Field("product")
    @JsonIgnoreProperties("orderItems")
    private Product product;

    @DBRef
    @Field("order")
    @JsonIgnoreProperties("orderItems")
    private ProductOrder order;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public OrderItem quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public OrderItem totalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public OrderItemStatus getStatus() {
        return status;
    }

    public OrderItem status(OrderItemStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(OrderItemStatus status) {
        this.status = status;
    }

    public Product getProduct() {
        return product;
    }

    public OrderItem product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ProductOrder getOrder() {
        return order;
    }

    public OrderItem order(ProductOrder productOrder) {
        this.order = productOrder;
        return this;
    }

    public void setOrder(ProductOrder productOrder) {
        this.order = productOrder;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderItem)) {
            return false;
        }
        return id != null && id.equals(((OrderItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", totalPrice=" + getTotalPrice() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}

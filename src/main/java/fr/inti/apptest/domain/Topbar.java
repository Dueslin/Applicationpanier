package fr.inti.apptest.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * A Topbar.
 */
@Document(collection = "topbar")
public class Topbar implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Topbar)) {
            return false;
        }
        return id != null && id.equals(((Topbar) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Topbar{" +
            "id=" + getId() +
            "}";
    }
}
